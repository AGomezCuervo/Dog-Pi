import React, { useEffect, useState } from "react"
import style from "./Form.module.css";
import axios from "axios";
import { CREATE_NEW_DOG } from "../../utils/constants";
import { validations } from "./validations";
import { Link } from "react-router-dom";

export interface ErrorsInput {
    name: string;
    height: string;
    weight: string;
    life_span: string;
    image: string;
    temperaments: string[];
}

export interface Input {
    name: string;
    min_height: string;
    max_height: string;
    min_weight: string;
    max_weight: string;
    min_life_span: string;
    max_life_span: string;
    image: string;
    temperaments: string[];
}



const Form =  () => {

    const [allowSubmit, setAllowSubmit] = useState(true)

    const [input, setInput] = useState<Input>({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: []
    })

    const [errors, setError] = useState<ErrorsInput>({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })

    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput({...input, [name]:value});
        setError(validations( value, name,errors, input))
        
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post(CREATE_NEW_DOG, input)
        .then(response => {
            console.log(response);
            
        })
        .catch(error => {
            console.log(error);
            
        })
    }

    useEffect(() => {
     setAllowSubmit(Object.values(input).every(item => item !== "") && Object.values(errors).every(error => error === ""))   
    }, [errors, input])


    return ( 
        <div className={style.BGContainer}>
            <div className={style.Wave}>
                <svg viewBox="0 100 1440 320">
                    <path fill="#197667" fill-opacity="1" 
                        d="M0,288L80,288C160,288,320,288,480,266.7C640,245,800,203,960,202.7C1120,203,1280,
                        245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>
            <Link to={"/"}>
                <button className={style.GoBack}>Go Back</button>
            </Link>
            <form className={style.Container} onSubmit={handleOnSubmit}>
                <div>
                    <div className={style.Option} >
                        <label htmlFor="name">Breed</label>
                        <input id="name" name="name" type="text" onChange={handleOnChange} />
                    </div>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <div className={`${style.Option} ${style.DoubleOption}`}>
                        <div className={ style.Option }>
                            <label htmlFor="min_height">Min height</label>
                            <input id="min_height" name="min_height" type="number" onChange={handleOnChange} min="0" />
                        </div>

                        <div className={style.Option}>
                            <label htmlFor="max_height">Max height</label>
                            <input id="max_height" name="max_height" type="number" onChange={handleOnChange} min="0" />
                        </div>
                    </div>
                    {errors.height && <p>{errors.height}</p>}
                </div>

                <div>
                    <div className={`${style.Option} ${style.DoubleOption}`}>
                        <div className={style.Option}>
                            <label htmlFor="min_weight:">Min weight</label>
                            <input id="min_weight:" name="min_weight:" type="number" onChange={handleOnChange} min="0" />
                        </div>

                        <div className={style.Option}>
                            <label htmlFor="max_weight:">Max weight</label>
                            <input id="max_weight:" name="max_weight:" type="number" onChange={handleOnChange} min="0"/>
                        </div>
                    </div>
                    {errors.weight && <p>{errors.weight}</p>}
                </div>

                <div>
                    <div className={`${style.Option} ${style.DoubleOption}`}>
                        <div className={style.Option}>
                            <label htmlFor="min_life_span">min lifespan</label>
                            <input id="min_life_span" name="min_life_span" type="number" onChange={handleOnChange} min="0" />
                        </div>
                        <div className={style.Option}>
                            <label htmlFor="max_life_span">max lifespan</label>
                            <input id="max_life_span" name="max_life_span" type="number" onChange={handleOnChange} min="0" />
                        </div>
                    </div>
                    {errors.life_span && <p>{errors.life_span}</p>}
                </div>
                <div>
                    <div className={style.Option}>
                        <label htmlFor="image">Image</label>
                        <input id="image" name="image" type="text" onChange={handleOnChange} />
                    </div>
                    {errors.image && <p>{errors.image}</p>}

                    <div className={style.ImageContainer}>
                        <img src={input.image} alt="img" />
                    </div>
                </div>

                <button type="submit" disabled={!allowSubmit}> Create Dog</button>


            </form>
        </div>
    )
} 

export default Form;