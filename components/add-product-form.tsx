'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {toast} from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Назва продукту повинна містити мінімум 2 символи.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Ціна повинна бути додатнім числом.",
  }),
  description: z.string().min(10, {
    message: "Опис повинен містити мінімум 10 символів.",
  }),
  image: z.string().url({
    message: "Будь ласка, введіть правильне URL для зображення продукту.",
  }),
})

export default function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const payload = {
      name: values.name,
      price: parseFloat(values.price),
      image: values.image,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast('Продукт успішно додано!')
        form.reset()
      } else {
        const error = await response.json()
        toast.error(`Не вдалося додати продукт: ${error.message}`)
      }
    } catch {
      toast.error(`Сталася помилка`)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва продукту</FormLabel>
              <FormControl>
                <Input placeholder="Введіть назву продукту" {...field} />
              </FormControl>
              <FormDescription>
                  Це назва, яка буде відображена для вашого продукту.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ціна</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="Ціна" {...field} />
              </FormControl>
              <FormDescription>
                  Введіть ціну в доларах. Використовуйте десятковий знак для копійок.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опис</FormLabel>
              <FormControl>
                <Textarea placeholder="Введіть опис для нового продукту" {...field} />
              </FormControl>
              <FormDescription>
                  Напишіть детальний опис вашого продукту.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL зображення продукту</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/product-image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                  Введіть URL зображення продукту.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Додається продукт..." : "Додати продукт"}
        </Button>
      </form>
    </Form>
  )
}

