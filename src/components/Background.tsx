import { FC } from "react";
import { Particles } from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import type { Engine } from "tsparticles-engine";

const Background: FC = () => {
	const customInit = async (engine: Engine): Promise<void> => {
		await loadStarsPreset(engine);
	};

	const options = {
		preset: "stars",
	};

	return <Particles options={options} init={customInit} />;
};

export { Background };
