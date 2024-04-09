"use client";
import React from 'react'
import * as z from 'zod'
import Heading from '@/components/heading'
import { MessageSquare } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { env } from 'process';
import { useRouter } from 'next/navigation';
// const axios = require('axios');
import axios from 'axios';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';



export default function ConversationPage() {

const  router = useRouter();
const [messages, setMessages] = React.useState<any []>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      prompt:''
    }
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        role: "user",
        content: values.prompt,
      };
  
      // Adicione a mensagem do usuário ao final da lista de mensagens
      const newMessages = [...messages, userMessage];
      // Atualize o estado das mensagens com a nova lista
      setMessages(newMessages);
  
      // Faça a chamada à API para obter a resposta do modelo
      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
  
      const botMessage = {
        role: "bot",
        content: response.data,
      };
  
      // Adicione a resposta do modelo ao final da lista de mensagens
      setMessages((current) => [...current, botMessage]);
  
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  
  
  return (
    <div>
      <Heading
       title='Conversation'
       description='Our most advanced conversation model.'
       icon={MessageSquare}
       iconColor='text-violet-500'
       bgColor='bg-violet-500/10'        
      ></Heading>

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
          >
            <FormField
             name='prompt'
             render={({field})=>(
              <FormItem  className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                    <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    placeholder='Ask me anything!'
                    {...field}
                    />
                </FormControl>
              </FormItem>
             )}
            />

            <Button className="col-span-12 lg:col-span-2 w-full" variant="custom" disabled={isLoading}>Generate</Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full  bg-muted">
            <Loader></Loader>
          </div>
        )}
        {messages.length === 0 && !isLoading && <Empty label='No conversation started'/>}
  <div className="flex flex-col-reverse gap-y-4">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`rounded-lg p-4 ${
          message.role === "user" ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        {message.content}
      </div>
    ))}
  </div>
</div>
    </div>
  )
}
