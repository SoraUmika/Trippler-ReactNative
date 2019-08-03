/**
 * Animation manager for the business screen.
 */
import React, { FC, memo } from "react";

import Screen from "./Screen";
import InfoCardAnimationManager from "./animationManager/infoCard";

/**
 * This component if for managing animation.
 * The actual presentational component is down below.
 */
const AnimationManager: FC = () => {
	const infoCardAnimationManager = new InfoCardAnimationManager();

	return <Screen infoCard={infoCardAnimationManager} />;
};

export default memo(AnimationManager, () => true);
