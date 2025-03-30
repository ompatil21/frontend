'use client'

import { useForm } from 'react-hook-form'

type Props = {
    data: {
        purchase_price: number
        deposit: number
        loan_amount: number
        interest_rate: number
        loan_term: number
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onNext: () => void
    onBack: () => void
}

export default function Step2PurchaseDetails({ data, updateFields, onNext, onBack }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        watch,
    } = useForm({
        defaultValues: data,
        mode: 'onChange', // Trigger validation live
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
        updateFields(values)
        onNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md p-8">
            <div>
                <label className="block font-medium text-gray-700 mb-1">Purchase Price ($)</label>
                <input
                    type="number"
                    {...register('purchase_price', { required: true, min: 1 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.purchase_price && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Deposit ($)</label>
                <input
                    type="number"
                    {...register('deposit', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.deposit && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Loan Amount ($)</label>
                <input
                    type="number"
                    {...register('loan_amount', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.loan_amount && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('interest_rate', { required: true, min: 0 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.interest_rate && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
                <label className="block font-medium text-gray-700 mb-1">Loan Term (years)</label>
                <input
                    type="number"
                    {...register('loan_term', { required: true, min: 1 })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                {errors.loan_term && <span className="text-red-500 text-sm">Required</span>}
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
                    className={`px-4 py-2 rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!isValid}
                >
                    Next
                </button>
            </div>
        </form>
    )
}
