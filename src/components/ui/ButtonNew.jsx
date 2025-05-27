import { Spinner } from "./Spinner"

const Button = ({children, size="big", onClick, boxShadow=true, padding='', type='button', loading=false, ...props}) => {
  return (
    <button
        {...props}
        variant="contained"
        type={type}
        className={`bg-[#FF7300] w-full ${size==="big" ? "px-[80px] py-2" : padding ? padding : "px-8 py-2"} sm:w-fit text-xl rounded-lg  text-white ${boxShadow ? 'buttonshadow' : ''}`}
        onClick={onClick}
        disabled={loading}
    >
      {loading ? <Spinner color="white" size="4" /> : children}
    </button>
  )
}

export default Button