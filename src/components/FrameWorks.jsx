import { useMediaQuery } from "react-responsive";
import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const skills = [
    "github",
    "html5",
    "css3",
    "javascript",
    "threejs",
    /*"react",*/
    "csharp",
    "cplusplus",
    "unreal",
    "unity",
    "blender",
    "touch",
    "illustrator",
    "afterEffects",
    "figma"
  ];
  /*return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);*/

/* NEW size adjusted icons*/

  const sizeMultipliers = {
    figma: 4 / 3, // two third bigger
    javascript: 3 / 4,
    html5: 4 / 5,
    css3: 4 / 5,
    touch: 4 / 5,
  };

  const outerIconSize = isMobile ? 27 : 35;
  const outerRadius = isMobile ? 120 : 130;
  const innerIconSize = isMobile ? 18 : 20;
  const innerRadius = isMobile ? 70 : 70;
  

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={outerIconSize} radius={outerRadius}>
        {skills.map((skill, index) => (
          <Icon
            key={index}
            src={`assets/logos/${skill}.svg`}
            scale={sizeMultipliers[skill]}
          />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={innerIconSize} radius={innerRadius} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon
            key={index}
            src={`assets/logos/${skill}.svg`}
            scale={sizeMultipliers[skill]}
          />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, scale }) => (
  <img
    src={src}
    className="duration-200 rounded-sm hover:scale-110"
    style={scale ? { transform: `scale(${scale})` } : undefined}
    loading="lazy"
  />
);