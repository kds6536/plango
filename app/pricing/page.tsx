"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, CreditCard, Shield, Plane, Star, Zap, Crown, Smartphone, Wallet, Building2 } from "lucide-react"
import Link from "next/link"
import { LanguageWrapper, useTranslations } from "@/components/language-wrapper"

function PricingContent() {
  const t = useTranslations()
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const handlePurchase = (planName: string) => {
    setSelectedPlan(planName)
    setIsPaymentOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-white transform rotate-45" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.logo}
            </span>
          </Link>
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.pricing.title}
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            {t.pricing.subtitle}
            <br />
            <span className="text-blue-600 font-semibold">{t.pricing.aiIncluded}</span>
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="relative border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300 bg-card">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">{t.pricing.free.name}</CardTitle>
              <div className="text-6xl font-black mt-6 text-foreground">$0</div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">{t.pricing.free.description}</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.free.features.basicContent}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.free.features.basicInfo}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.free.features.monthlyLimit}</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full h-16 text-lg font-semibold border-2 border-border">
                {t.pricing.free.button}
              </Button>
            </CardContent>
          </Card>

          {/* One-time Plan */}
          <Card className="relative border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 bg-card">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">{t.pricing.oneTime.name}</CardTitle>
              <div className="text-6xl font-black mt-6 text-blue-600">$20</div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">{t.pricing.oneTime.description}</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.oneTime.features.oneItinerary}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.oneTime.features.detailedContent}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.oneTime.features.recommendations}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{t.pricing.oneTime.features.pdfDownload}</span>
                </li>
              </ul>
              <Button
                onClick={() => handlePurchase(t.pricing.oneTime.name)}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                {t.pricing.oneTime.button}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-4 border-purple-500 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-card transform scale-105">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                {t.pricing.premium.badge}
              </span>
            </div>
            <CardHeader className="text-center pb-8 pt-16">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">{t.pricing.premium.name}</CardTitle>
              <div className="text-6xl font-black mt-6 text-purple-600">
                $50 <span className="text-2xl font-normal text-muted-foreground">{t.pricing.premium.period}</span>
              </div>
              <p className="text-muted-foreground mt-3 text-lg font-medium">{t.pricing.premium.description}</p>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">{t.pricing.premium.features.unlimited}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">{t.pricing.premium.features.advanced}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">{t.pricing.premium.features.detailedInfo}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">{t.pricing.premium.features.realTimeEdit}</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground font-medium">{t.pricing.premium.features.prioritySupport}</span>
                </li>
              </ul>
              <Button
                onClick={() => handlePurchase(t.pricing.premium.name)}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                {t.pricing.premium.button}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="max-w-6xl mx-auto mb-20">
          <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-4xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                {t.pricing.comparison.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="pb-6 text-xl font-bold text-foreground">{t.pricing.comparison.feature}</th>
                      <th className="pb-6 text-xl font-bold text-center text-foreground">{t.pricing.free.name}</th>
                      <th className="pb-6 text-xl font-bold text-center text-foreground">{t.pricing.oneTime.name}</th>
                      <th className="pb-6 text-xl font-bold text-center text-purple-600">{t.pricing.premium.name}</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    <tr className="border-b border-border">
                      <td className="py-6 font-semibold text-lg text-foreground">{t.pricing.comparison.itineraryCount}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">{t.pricing.comparison.monthlyOne}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">{t.pricing.comparison.oneTime}</td>
                      <td className="py-6 text-center text-lg font-semibold text-purple-600">{t.pricing.comparison.unlimited}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-6 font-semibold text-lg text-foreground">{t.pricing.comparison.detailLevel}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">{t.pricing.comparison.basic}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">{t.pricing.comparison.detailed}</td>
                      <td className="py-6 text-center text-lg font-semibold text-purple-600">{t.pricing.comparison.premium}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-6 font-semibold text-lg text-foreground">{t.pricing.comparison.pdfDownload}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">❌</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">✅</td>
                      <td className="py-6 text-center text-lg font-semibold text-purple-600">✅</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-6 font-semibold text-lg text-foreground">{t.pricing.comparison.realTimeEdit}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">❌</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">❌</td>
                      <td className="py-6 text-center text-lg font-semibold text-purple-600">✅</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-6 font-semibold text-lg text-foreground">{t.pricing.comparison.prioritySupport}</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">❌</td>
                      <td className="py-6 text-center text-lg text-muted-foreground">❌</td>
                      <td className="py-6 text-center text-lg font-semibold text-purple-600">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">
                {t.pricing.payment.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t.pricing.payment.card}</h3>
                  <p className="text-muted-foreground">{t.pricing.payment.cardDesc}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t.pricing.payment.mobile}</h3>
                  <p className="text-muted-foreground">{t.pricing.payment.mobileDesc}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{t.pricing.payment.bank}</h3>
                  <p className="text-muted-foreground">{t.pricing.payment.bankDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.pricing.modal.title} - {selectedPlan}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">{t.pricing.modal.cardNumber}</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">{t.pricing.modal.expiry}</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">{t.pricing.modal.cvc}</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">{t.pricing.modal.name}</Label>
              <Input id="name" placeholder={t.pricing.modal.namePlaceholder} />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {t.pricing.modal.confirm}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PricingPage() {
  return (
    <LanguageWrapper>
      <PricingContent />
    </LanguageWrapper>
  )
}
