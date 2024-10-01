interface HeroSelectProps {
    heroSelect: number;
    currentHero: number;
    handleSelect: any;
}

export default function HeroSelect(props: HeroSelectProps) {

    const heroSelected = props.heroSelect === props.currentHero;

    return <div className="stats-row">
        <button className={`character-select justify-items-center grid ${heroSelected ? 'selected' : ''}` }
                value="Select" onClick={props.handleSelect}>
            <p className="character-select-text">{heroSelected ? 'SELECTED' : 'SELECT'}</p>
        </button>
    </div>
}