"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

export async function getAppointments() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                doctor: {
                    select: {
                        name: true,
                        imageUrl: true,
                    }
                },
            },
            orderBy: {
                createdAt: "desc",
            }
        })

        return appointments;

    } catch (error) {
        console.log("Error fetching Appointments: ", error)
        throw new Error("Falied to fetch appointments");
    }
}

export async function getUserAppointmentStats() {
    try {
        const {userId} = await auth()
        if(!userId) throw new Error("You must be Authenticated")

        const user = await prisma.user.findUnique({
            where: {clerkId: userId}
        })

        if(!user) throw new Error("User not found")

        const [totalCount, completedCount] = await Promise.all([
            prisma.appointment.count({
                where: {userId: user.id},
            }),
            prisma.appointment.count({
                where: {
                    userId: user.id,
                    status: "COMPLETED",
                },
            }),
        ])

        return {totalAppointments:totalCount, completedAppointments: completedCount};

    } catch (error) {
        console.log("Error fetching user appointment status", error)
        return {totalAppointments:0, completedAppointment: 0};
    }
}

export async function getUserAppointment() {
    try {
        const { userId } = await auth()
        if(!userId) throw new Error("You must be logged in to view appointments")

        const user = await prisma.user.findUnique({
            where: { clerkId: userId}
        })

        if(!user) throw new Error("User not found, Please ensure your account is properly set up")

        const appointments = await prisma.appointment.findMany({
            include: {
                user: {select: {firstName: true, lastName: true, email:true}},
                doctor: {select: { name: true, imageUrl: true}},
            },
            orderBy: [{ date: "asc"}, { time: "asc"}],
        })

        return appointments.map(transformAppointment)
    } catch (error) {
        console.error("Error fetching user appointments", error);
        throw new Error("Failed to fetch user appointments")
    }
}