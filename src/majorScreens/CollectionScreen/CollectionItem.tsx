/**
 * Items of the collection list.
 *
 * @param {string} businessId the id of the target business.
 *
 * TODO add icon display.
 */
import React, { FC, memo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";

import ArrowUpward from "../../svg/ArrowUpward";
import Explore from "../../svg/Explore";
import CenterView from "../../components/CenterView";
import DeleteOutline from "../../svg/DeleteOutline";
// import ArrowDownward from "../../svg/ArrowDownward";
import {
	getBusinessData,
	getAccentColor,
	getBackgroundColor,
	getAreBusinessesOpen,
	getOpenedData
} from "../../redux/selectors";
import {
	removedCollectItem,
	pinCollectItem,
	unPinCollectItem,
	openBusiness
} from "../../redux/action/actions";

interface Props {
	businessId: string;
	pinned?: boolean;
	showPin?: boolean;
	isRecom?: boolean;
}

const RightAction = (
	onRemoved: () => void,
	onPin: () => void,
	onUnPin: () => void,
	showPin?: boolean,
	pinned?: boolean
) => {
	return (
		<View style={styles.rightActionContainer}>
			<TouchableOpacity style={styles.rightActionButton} onPress={onRemoved}>
				<DeleteOutline fill="#D52941" />
				<Text style={styles.rightActionDeleteText}>Remove</Text>
			</TouchableOpacity>
			{/* {showPin && (
				<TouchableOpacity
					style={styles.rightActionButton}
					onPress={pinned ? onUnPin : onPin}
				>
					{pinned ? <ArrowDownward fill="#0EAD69" /> : <ArrowUpward fill="#0EAD69" />}
					<Text style={styles.rightActionPinText}>{pinned ? "Un-pin" : "Pin"}</Text>
				</TouchableOpacity>
			)} */}
		</View>
	);
};

const CollectionItem: FC<Props> = props => {
	const { businessId, pinned, showPin, isRecom } = props;
	const business = useSelector(getBusinessData)[businessId];
	const isOpen = useSelector(getAreBusinessesOpen)[businessId];
	const accentColor = useSelector(getAccentColor);
	const backgroundColor = useSelector(getBackgroundColor);
	const openedBusinessId = useSelector(getOpenedData).id;
	const dispatch = useDispatch();

	const isOpened = openedBusinessId == businessId;

	return (
		<Swipeable
			renderRightActions={
				isRecom
					? undefined
					: () =>
							RightAction(
								() => dispatch(removedCollectItem(businessId)),
								() => dispatch(pinCollectItem(businessId)),
								() => dispatch(unPinCollectItem(businessId)),
								showPin,
								pinned
							)
			}
			overshootFriction={8}
		>
			<View
				style={{
					...styles.root,
					backgroundColor: backgroundColor
				}}
				onTouchEnd={() => dispatch(openBusiness(isRecom ? null : businessId))}
			>
				{isOpened && (
					<View style={{ ...styles.recomIndicator, backgroundColor: accentColor }} />
				)}
				<View style={styles.container}>
					<View style={styles.avatar} />
					<View style={styles.description}>
						<CenterView main>
							<Text style={styles.name}>{business.name}</Text>
							{pinned && (
								<ArrowUpward
									fill={accentColor}
									style={styles.pinIcon}
									opacity={0.75}
								/>
							)}
							{isRecom && (
								<Explore fill={accentColor} style={styles.pinIcon} opacity={0.75} />
							)}
						</CenterView>
						<View style={styles.statContainer}>
							<CenterView main>
								<Text style={styles.status}>
									Currently {isOpen ? "open" : "close"}
								</Text>
							</CenterView>
							<View style={styles.ratingContainer}>
								<Text style={styles.ratingNum}>({business.ratingNum})</Text>
								<Text style={styles.rating}>{business.rating}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	root: {
		height: 80,
		paddingHorizontal: 16
	},
	recomIndicator: {
		position: "absolute",
		left: -100,
		top: 0,
		height: "100%",
		width: 104,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4
	},
	container: {
		flex: 1,
		flexDirection: "row"
	},
	avatar: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: 60,
		height: 60,
		borderRadius: 30,
		margin: 10
	},
	description: {
		flex: 1,
		padding: 16
	},
	name: {
		color: "black",
		opacity: 0.6,
		fontWeight: "bold",
		fontSize: 24
	},
	status: {
		color: "black",
		opacity: 0.5,
		fontSize: 16
	},
	rating: {
		color: "black",
		opacity: 0.5,
		textAlign: "right",
		fontSize: 16,
		flex: 0,
		fontWeight: "bold"
	},
	statContainer: {
		flex: 1,
		flexDirection: "row",
		marginTop: 16
	},
	pinIcon: {
		position: "absolute",
		right: 0
	},
	ratingNum: {
		color: "black",
		opacity: 0.5,
		textAlign: "right",
		fontSize: 16,
		flex: 0
	},
	ratingContainer: {
		flex: 1,
		flexDirection: "column",
		flexWrap: "wrap-reverse"
	},
	rightActionContainer: {
		flex: 0,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginRight: 16
	},
	rightActionDeleteText: {
		color: "#D52941",
		marginRight: 16,
		fontWeight: "bold"
	},
	rightActionPinText: {
		color: "#0EAD69",
		marginRight: 16,
		fontWeight: "bold"
	},
	rightActionButton: {
		flex: 0,
		flexDirection: "row",
		alignItems: "center"
	}
});

export default memo(CollectionItem, (p, n) => p.isRecom == n.isRecom);
