'use client'

import { useState } from 'react'
import Step1BasicInfo from './Step1BasicInfo'
import Step2PurchaseDetails from './Step2PurchaseDetails'
import Step3RentalInfo from './Step3RentalInfo'
import Step4Expenses from './Step4Expenses'
import ProgressBar from './ProgressBar'
import ConfirmationScreen from './ConfirmationScreen'
import { createProperty } from '@/services/api'


type PropertyFormData = {
    title: string
    location: string
    type: string
    purchase_price: number
    deposit: number
    loan_amount: number
    interest_rate: number
    loan_term: number
    rent: number
    vacancy_rate: number
    council_rates: number
    insurance: number
    maintenance: number
    property_manager: number

}
export default function PropertyForm() {
    const [step, setStep] = useState(1)
    const stepLabels = ['Basic Info', 'Purchase', 'Rental Info', 'Expenses']
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        location: '',
        type: '',
        purchase_price: 0,
        deposit: 0,
        loan_amount: 0,
        interest_rate: 0,
        loan_term: 0,
        rent: 0,
        vacancy_rate: 0,
        council_rates: 0,
        insurance: 0,
        maintenance: 0,
        property_manager: 0,
    })

    const updateFields = (fields: Partial<PropertyFormData>) => {
        setFormData(prev => ({ ...prev, ...fields }))
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    <ConfirmationScreen
                        data={formData}
                        onDone={() => {
                            setFormData({
                                title: '',
                                location: '',
                                type: '',
                                purchase_price: 0,
                                deposit: 0,
                                loan_amount: 0,
                                interest_rate: 0,
                                loan_term: 0,
                                rent: 0,
                                vacancy_rate: 0,
                                council_rates: 0,
                                insurance: 0,
                                maintenance: 0,
                                property_manager: 0,
                            })
                            setStep(1)
                            setIsSubmitted(false)
                        }}
                    />
                </div>
            </div>
        )
    }

    // ✅ This return was missing
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Add Property</h2>

                <ProgressBar step={step} totalSteps={stepLabels.length} labels={stepLabels} />

                {step === 1 && (
                    <Step1BasicInfo
                        data={formData}
                        updateFields={updateFields}
                        onSuccess={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <Step2PurchaseDetails
                        data={formData}
                        updateFields={updateFields}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <Step3RentalInfo
                        data={formData}
                        updateFields={updateFields}
                        onBack={() => setStep(2)}
                        onNext={() => setStep(4)}
                    />
                )}

                {step === 4 && (
                    <Step4Expenses
                        data={formData}
                        updateFields={updateFields}
                        onBack={() => setStep(3)}
                        onSubmit={async () => {
                            try {
                                const res = await createProperty(formData)
                                console.log("Submitted to backend:", res)
                                setIsSubmitted(true)
                            } catch (err) {
                                alert("Submission failed. Try again.")
                                console.error(err)
                            }
                        }}
                    />
                )}
            </div>
        </div>
    )
}

