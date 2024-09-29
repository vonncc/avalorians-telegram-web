export default function HeroSelect() {

    const handleButtonClick = () => {
        console.log('click');
    }

    return <>
        <button className="character-select justify-items-center grid"
                value="Select" onClick={() => handleButtonClick()}>
            <p className="character-select-text">Select</p>
        </button>
    </>
}