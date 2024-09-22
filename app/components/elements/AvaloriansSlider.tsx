// MyButton.tsx
import {extendVariants, Slider} from "@nextui-org/react";

export const AvalorianSlider = extendVariants(Slider, {
  variants: {
    isDisabled: {true: {
        base: "opacity-100"
    }}
  },
  
 
});

export function AvalorianDesignedSlider({
    experience,
    level,
    nextLevelExp,
  }: {
    experience: number;
    level: number;
    nextLevelExp: number[];
  }) {
    return (
      <AvalorianSlider
        size="md"
        defaultValue={experience}
        minValue={level - 1 <= 0 ? 0 : nextLevelExp[level - 1]}
        maxValue={nextLevelExp[level - 1]}
        isDisabled
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-self",
          filler: "slider-color",
        }}
        renderThumb={(props) => (
          <div {...props} className="group p-1 top-1/2">
            <span className="w-10 h-10 block">
              <img
                src="/assets/images/sliderStar.png"
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