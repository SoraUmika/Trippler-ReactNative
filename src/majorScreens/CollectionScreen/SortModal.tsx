import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import Modal from "../../components/Modal";

interface Props {
	visible: boolean;
	onHide: () => void;
}

const SortModal: FC<Props> = props => {
	const { visible, onHide } = props;

	return (
		<Modal visible={visible} onHide={onHide}>
			<View />
		</Modal>
	);
};

const styles = StyleSheet.create({});

export default styles;
