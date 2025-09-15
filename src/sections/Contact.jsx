import React, { useRef, useState } from 'react';
import emailjs from "@emailjs/browser"
const Contact = () => {
    const formRef = useRef()
    const [loading , setLoading] = useState(false)
    const [form ,setForm] = useState({
        name:"",
        email:"",
        message: ""
    })
    const handleChange = ({target: {name, value}})=> {
        setForm({...form, [name]: [value] })
    }
    const handleSubmit = async (e)=> {
        e.preventDefault();

        setLoading(true)

        try{
             await  emailjs.send('service_aqm9eua',
                'template_oxfdpcf',
               {
                name: form.name,
                to_name: 'goodness',
                email: form.email,
                to_email: "adewolegoodness22@gmail.com",
                message:form.message
            },
            'cv2I_dwTk6foaIr_C'

        )
        setLoading(false)
        alert("your message has been sent!")
        setForm({
            name:"",
            email:"",
            message: ""

        })

        }
        catch(error){
            setLoading(false)
            console.log(error
            )

        }
     

    }
  return (
    <section className='c-space my-20'>
        <div className='relative min-h-screen flex
        items-center justify-center flex-col'>
          
            <div className='contact-container'>
               <h3 className='head-text'> Let's talk</h3>
               <p className='text-lg text-white-600 mt-3'>
                Whether you're looking to build a new website 
                improve your existing platform, or bring a unique
                project to life, I'm here to help 
               </p>
               <form ref={formRef} onSubmit={handleSubmit}
               className='mt-12 flex flex-col space-y-7'>
                <label className='space-y-3'>
                    <span className='field-label'>Full Name</span>
                    <input 
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    className='field-input'
                    placeholder='John Doe'
                    />
                </label>
                  <label className='space-y-3'>
                    <span className='field-label'>Email</span>
                    <input 
                    type='text'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                    className='field-input'
                    placeholder='JohnDoe@gmail.com'
                    />
                </label>
                 <label className='space-y-3'>
                    <span className='field-label'>Your message</span>
                    <textarea
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={2}
                    className='field-input'
                    placeholder="Hi, I'm intersted..."
                    />
                </label>
                <button className='field-btn' type='submit'
                disabled={loading}>
                    {loading ? 'Sending...' : "Send Message"}
                    <img src='/assets/arrow-up.png'
                    alt='arrow-up'
                    className='field-btn_arrow'/>
                </button>

               </form>
            </div>
        </div>
      
    </section>
  );
}

export default Contact;
//billycoinbsc.com