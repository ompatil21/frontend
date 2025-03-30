/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
    data: any
    onDone: () => void
}

// Format numbers into AUD currency
const formatCurrency = (value: number | string) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(Number(value))

// Simple ROI & Cash Flow calculation (can be improved later)
const calculateROI = (data: any) => {
    const totalInvestment = Number(data.deposit) + Number(data.council_rates) + Number(data.insurance)
    const annualRent = Number(data.rent) * 12 * (1 - Number(data.vacancy_rate) / 100)
    return ((annualRent / totalInvestment) * 100).toFixed(2)
}

const calculateMonthlyCashFlow = (data: any) => {
    const income = Number(data.rent)
    const expenses = (
        Number(data.council_rates) +
        Number(data.insurance) +
        Number(data.maintenance) +
        Number(data.property_manager)
    ) / 12
    return formatCurrency(income - expenses)
}

export default function ConfirmationScreen({ data, onDone }: Props) {
    const roi = calculateROI(data)
    const cashFlow = calculateMonthlyCashFlow(data)

    return (
        <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="text-center mb-6">
                <div className="flex items-center justify-center text-green-600 text-3xl mb-2">✅</div>
                <h2 className="text-2xl font-bold text-gray-800">Property Submitted Successfully</h2>
                <p className="text-gray-500 mt-1">Here is a summary of your entry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                {/* 🏠 Basic Info */}
                <div>
                    <h4 className="text-gray-500 font-semibold mb-2">🏠 Basic Info</h4>
                    <p><strong>Title:</strong> {data.title}</p>
                    <p><strong>Location:</strong> {data.location}</p>
                    <p><strong>Type:</strong> {data.type}</p>
                </div>

                {/* 💰 Purchase Details */}
                <div>
                    <h4 className="text-gray-500 font-semibold mb-2">💰 Purchase Details</h4>
                    <p><strong>Price:</strong> {formatCurrency(data.purchase_price)}</p>
                    <p><strong>Deposit:</strong> {formatCurrency(data.deposit)}</p>
                    <p><strong>Loan:</strong> {formatCurrency(data.loan_amount)}</p>
                    <p><strong>Interest Rate:</strong> {data.interest_rate}%</p>
                    <p><strong>Loan Term:</strong> {data.loan_term} yrs</p>
                </div>

                {/* 📈 Rental Info */}
                <div>
                    <h4 className="text-gray-500 font-semibold mb-2">📈 Rental Info</h4>
                    <p><strong>Rent:</strong> {formatCurrency(data.rent)} / month</p>
                    <p><strong>Vacancy Rate:</strong> {data.vacancy_rate}%</p>
                </div>

                {/* 🧾 Expenses */}
                <div>
                    <h4 className="text-gray-500 font-semibold mb-2">🧾 Expenses</h4>
                    <p><strong>Council Rates:</strong> {formatCurrency(data.council_rates)}</p>
                    <p><strong>Insurance:</strong> {formatCurrency(data.insurance)}</p>
                    <p><strong>Maintenance:</strong> {formatCurrency(data.maintenance)}</p>
                    <p><strong>Property Manager:</strong> {formatCurrency(data.property_manager)}</p>
                </div>
            </div>

            {/* ROI & Cash Flow Summary */}
            <div className="mt-8 bg-gray-50 p-4 rounded-md border text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">📊 Quick Financial Summary</h4>
                <p><strong>Estimated ROI:</strong> {roi}%</p>
                <p><strong>Estimated Monthly Cash Flow:</strong> {cashFlow}</p>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onDone}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
                >
                    Add Another Property
                </button>
            </div>
        </div>
    )
}
