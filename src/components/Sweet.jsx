import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice"

const Sweet = ({ sweet }) => {
    let disp = useDispatch();
    return (<div>
        <h2>{sweet.name} </h2>
        <h2>{sweet._id}</h2>
        <h2>{sweet.description}</h2>
        <img src={sweet.picture} />
        <input type="button" value="🗑️" onClick={() => { disp(addToCart(sweet)) }} />
    </div>)
}
export default Sweet;