"use client";

import { createDoctor, getDoctors, updateDoctor, getAvailableDoctors } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
    const result = useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors,
    })

    return result;
}

export function useCreateDoctor(){
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: createDoctor,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["getDoctors"]})
        },
        onError: (error) => console.log("Error while creating doctor",error),
    });

    return result;
}
export function useUpdateDoctor(){
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn: updateDoctor,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["getDoctors"]})
        },
        onError: (error) => console.log("Error while updating doctor",error),
    });

    return result;
}

export function useAvailableDoctors() {
    const result = useQuery({
        queryKey: ["getAvailableDoctors"],
        queryFn: getAvailableDoctors,
    });
    return result;
}

