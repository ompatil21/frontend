'use client'

import { useForm } from 'react-hook-form'

type Props = {
    data: {
        council_rates: number
        insurance: number
        maintenance: number
        property_manager: number
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onSubmit: () => void
    onBack: () => void
}

export default function Step4Expenses({ data, updateFields, onSubmit, onBack }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: data,
        mode: 'onChange',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFinalSubmit = (values: any) => {
        updateFields(values)
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-8">
            <div>
                <label className="block font-medium text-gray-700 mb-1">Council Rates ($/year)</label>
                <input
                    type="number"
                    {...register('council_rates', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.council_rates && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Insurance ($/year)</label>
                <input
                    type="number"
                    {...register('insurance', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.insurance && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Maintenance ($/year)</label>
                <input
                    type="number"
                    {...register('maintenance', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.maintenance && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Property Manager Fees ($/year)</label>
                <input
                    type="number"
                    {...register('property_manager', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.property_manager && <span className="text-red-500 text-sm">Required</span>}
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
                    className={`px-4 py-2 rounded-md text-white ${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Submit Property
                </button>
            </div>
        </form>
    )
}
