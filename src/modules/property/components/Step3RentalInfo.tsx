'use client'

import { useForm } from 'react-hook-form'

type Props = {
    data: {
        rent: number
        vacancy_rate: number
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void
    onBack: () => void
}

export default function Step3RentalInfo({ data, updateFields, onNext, onBack }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: data,
        mode: 'onChange',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        updateFields(values)
        onNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-8">
            <div>
                <label className="block font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
                <input
                    type="number"
                    {...register('rent', { required: true, min: 1 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.rent && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
                <input
                    type="number"
                    step="0.1"
                    {...register('vacancy_rate', { required: true, min: 0, max: 100 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.vacancy_rate && (
                    <span className="text-red-500 text-sm">Required and must be between 0–100%</span>
                )}
            </div>

            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                    Back
                </button>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`px-4 py-2 rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Next
                </button>
            </div>
        </form>
    )
}
