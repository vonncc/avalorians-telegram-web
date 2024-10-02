import {extendVariants, Slider} from "@nextui-org/react";
import styles from '../../styles/cc.module.css'


export const AvalorianSliderCC = extendVariants(Slider, {
  variants: {
    isDisabled: {true: {
        base: "opacity-100"
    }}
  }
});

export function AvalorianDesignedSliderCC({
    min,
    max,
    currentValue
  }: {
    min: number;
    max: number;
    currentValue: number;
  }) {
    return (
      <AvalorianSliderCC
        size="md"
        value={currentValue}
        minValue={min}
        maxValue={max}
        isDisabled
        classNames={{
          //base: "max-w-md gap-3",
          track: styles.customSliderTrack,
          filler: styles.customSliderFiller
        }}
        
        renderThumb={(props) => (
          <div {...props} className="group p-1 top-1/2">
            <span className="w-10 h-10 block">
              <img
                src="/assets/images/icons/sliderStar.png"
                width={40}
                height={40}
                alt="star icon"
              />
            </span>
          </div>
        )}
      />
    );
  }
