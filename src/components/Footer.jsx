import duit from '../duit.svg'
import '../components/footer.css';

const Footer = () => {
    return(
        <div>
        <span id='footer'>
            <img src={duit} alt="" width={100} height={100} className='m-auto items-center pt-12'/>
        </span>
        <h4 className='text-opacity-4 p-3 font-abc'>&copy; 2024 Candi Builder at Garuda Hacks 5.0</h4>
        </div>
    )
}

export default Footer;