interface HeroSelectProps {
    isSelected: boolean;
}

export default function HeroSelect(props: HeroSelectProps) {

    const handleButtonClick = () => {
        console.log('click');
    }

    return <div className="stats-row">
        <button className={`character-select justify-items-center grid ${props.isSelected ? 'selected' : ''}` }
                value="Select" onClick={() => handleButtonClick()}>
            <p className="character-select-text">Select</p>
        </button>
    </div>
}