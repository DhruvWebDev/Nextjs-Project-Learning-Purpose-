'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from 'lucide-react'
import { plans } from '@/components/pricing-plan'
export default function Page() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 container mx-auto px-4 py-16 overflow-visible">
        <h1 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h1>
        <p className="text-xl text-center text-zinc-400 mb-8">Get started with TaskFlow today and boost your productivity</p>
        
        <div className="relative z-20 mb-8 flex justify-center">
          <Select value={billingCycle} onValueChange={(value: 'monthly' | 'annual') => setBillingCycle(value)}>
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Select billing cycle" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white absolute mt-1 z-50">
              <SelectItem value="monthly" className="hover:bg-zinc-700 focus:bg-zinc-700">Monthly Billing</SelectItem>
              <SelectItem value="annual" className="hover:bg-zinc-700 focus:bg-zinc-700">Annual Billing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-zinc-400">
                  Perfect for {plan.name === "Basic" ? "individuals" : plan.name === "Pro" ? "small teams" : "large organizations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  ${billingCycle === 'monthly' ? plan.price.monthly : (plan.price.annual / 12).toFixed(2)}
                  <span className="text-lg font-normal text-zinc-400">/month</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Choose {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}