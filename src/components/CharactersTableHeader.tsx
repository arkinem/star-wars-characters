import { FC } from "react";
import styled from "styled-components";

import { t } from "a11y/dictionary";
import { SortAscIcon } from "components/icons/SortAscIcon";
import { SortDscIcon } from "components/icons/SortDscIcon";
import { SortUnselectedIcon } from "components/icons/SortUnselectedIcon";
import { CharactersTableSortMode } from "constants/table";
import { theme } from "constants/theme";

interface Props {
	sortMode?: CharactersTableSortMode;
	setSortMode: (sortMode: CharactersTableSortMode | undefined) => void;
	isDataLoading: boolean;
}

const CharactersTableHeader: FC<Props> = ({ sortMode, setSortMode, isDataLoading }) => {
	const handleNameFilter = () => {
		if (sortMode === CharactersTableSortMode.NAME_ASC) {
			setSortMode(CharactersTableSortMode.NAME_DSC);
		} else {
			setSortMode(CharactersTableSortMode.NAME_ASC);
		}
	};

	const handleFilmCountFilter = () => {
		if (sortMode === CharactersTableSortMode.FILM_COUNT_ASC) {
			setSortMode(CharactersTableSortMode.FILM_COUNT_DSC);
		} else {
			setSortMode(CharactersTableSortMode.FILM_COUNT_ASC);
		}
	};

	return (
		<thead>
			<tr>
				<th>
					<TableHeadCellPressable
						role="button"
						disabled={isDataLoading}
						onClick={isDataLoading ? undefined : () => handleNameFilter()}
					>
						<TableHeadCellContent>
							{t("table.header.name")}{" "}
							{sortMode === CharactersTableSortMode.NAME_ASC ? (
								<SortAscIcon />
							) : sortMode === CharactersTableSortMode.NAME_DSC ? (
								<SortDscIcon />
							) : (
								<SortUnselectedIcon />
							)}
						</TableHeadCellContent>
					</TableHeadCellPressable>
				</th>
				<th>
					<TableHeadCellContent>{t("table.header.birthYear")}</TableHeadCellContent>
				</th>
				<th>
					<TableHeadCellContent>{t("table.header.homeWorld")}</TableHeadCellContent>
				</th>
				<th>
					<TableHeadCellPressable
						role="button"
						disabled={isDataLoading}
						onClick={isDataLoading ? undefined : () => handleFilmCountFilter()}
					>
						<TableHeadCellContent>
							{t("table.header.noOfFilms")}{" "}
							{sortMode === CharactersTableSortMode.FILM_COUNT_ASC ? (
								<SortAscIcon />
							) : sortMode === CharactersTableSortMode.FILM_COUNT_DSC ? (
								<SortDscIcon />
							) : (
								<SortUnselectedIcon />
							)}
						</TableHeadCellContent>
					</TableHeadCellPressable>
				</th>
			</tr>
		</thead>
	);
};

const TableHeadCellContent = styled.div`
	padding: 8px;
	text-align: center;
	vertical-align: middle;
	margin-bottom: 5px;
`;

const TableHeadCellPressable = styled.div<{ disabled: boolean }>`
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	:hover {
		background-color: ${({ disabled }) =>
			disabled ? theme.colors.background : theme.colors.table.header.hoverBackground};
	}

	:active {
		background-color: ${({ disabled }) =>
			disabled ? theme.colors.background : theme.colors.table.header.activeBackground};
	}
`;

export { CharactersTableHeader };
