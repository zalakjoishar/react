import React from 'react'
import {useForm} from 'react-hook-form'

function FileExample() {

    const {register,handleSubmit,formState:{errors}}=useForm()

    const onSubmit=(data)=>{
        console.log("Form Submited",data);
        
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="">Enter name</label>
                <input type="text" {...register("name",{'required':'Name is required'})}/>
                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            </div>

             <div className="mb-3">
                <label htmlFor="">Enter age</label>
                <input type="number" {...register("age",{'min':{value:10,message:"minimum age 10 is requirede"}},{'max':{value:50,message:"maximum age 50 is requirede"}},{'required':'Age is required'})}/>
                {errors.age && <p className='text-danger'>{errors.age.message}</p>}
            </div>

             <div className="mb-3">
                <label htmlFor="">Enter email</label>
                <input type="email" {...register("email",{'minLength':{value:12,message:"minimum length is 10"}},{'maxLength':{value:50,message:"max length is 50"}},{'required':'Email is required'})}/>
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>


            <button type='submit'> ADD</button>
        </form>
    </div>
  )
}

export default FileExample