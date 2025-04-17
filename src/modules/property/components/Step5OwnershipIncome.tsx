/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { User, Percent, DollarSign, PlusCircle, Trash2 } from 'lucide-react'

type Owner = {
    name: string
    ownership: number | undefined
    income: number | undefined
}

type Props = {
    data: {
        owners: Owner[]
        wage_growth: number | undefined
    }
    updateFields: (fields: Partial<Props['data']>) => void
    onBack: () => void
    onSubmit: () => void
}

export default function Step5OwnershipIncome({ data, updateFields, onBack, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            owners: data.owners.length > 0 ? data.owners : [{ name: '', ownership: undefined, income: undefined }],
            wage_growth: data.wage_growth ?? undefined,
        },
        mode: 'onChange',
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'owners',
    })

    const handleFinalSubmit = (values: any) => {
        console.log('🔍 Raw owners submitted:', values.owners)

        const validOwners = values.owners.filter(
            (owner: any) =>
                owner.name.trim() !== '' &&
                owner.ownership !== undefined &&
                owner.income !== undefined
        )

        console.log('✅ Filtered valid owners:', validOwners)

        if (validOwners.length === 0) {
            alert('Please enter at least one valid owner with name, % and income.')
            return
        }

        const parsedValues = {
            wage_growth: Number(values.wage_growth),
            owners: validOwners.map((owner: any) => ({
                name: owner.name.trim(),
                ownership: Number(owner.ownership),
                income: Number(owner.income),
            })),
        }

        updateFields(parsedValues)
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">👥 Ownership Structure</h3>

            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md space-y-3 bg-gray-50 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <User size={16} /> Owner Name
                            </label>
                            <input
                                {...register(`owners.${index}.name`, { required: true, minLength: 1 })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                placeholder="e.g. John Doe"
                            />
                            {errors.owners?.[index]?.name && (
                                <p className="text-sm text-red-500">Name is required</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <Percent size={16} /> Ownership %
                            </label>
                            <input
                                type="number"
                                {...register(`owners.${index}.ownership`, {
                                    required: true,
                                    min: 0,
                                    max: 100,
                                })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            {errors.owners?.[index]?.ownership && (
                                <p className="text-sm text-red-500">Must be between 0 and 100</p>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                                <DollarSign size={16} /> Income ($)
                            </label>
                            <input
                                type="number"
                                {...register(`owners.${index}.income`, { required: true, min: 0 })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            {errors.owners?.[index]?.income && (
                                <p className="text-sm text-red-500">Required</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() =>
                    append({ name: '', ownership: undefined, income: undefined })
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
                <PlusCircle size={18} /> Add Owner
            </button>

            <div className="pt-6">
                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                    📈 Wage Growth Rate (%)
                </label>
                <input
                    type="number"
                    step="0.1"
                    {...register('wage_growth', { required: true, min: 0 })}
                    className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2"
                />
                {errors.wage_growth && (
                    <p className="text-sm text-red-500">Required</p>
                )}
            </div>

            <div className="flex justify-between pt-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                >
                    ← Back
                </button>
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`px-6 py-2 rounded-md text-white font-semibold transition ${isValid
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Submit →
                </button>
            </div>
        </form>
    )
}
