import {
  Group,
  Header,
  Select,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { ChangeEvent, useEffect, useState } from "react";
import { IFetchParams } from "../../api/groups";
import useGetGroups from "../../hooks/use-get-groups";
import { GroupCell } from "../group-cell";
import { filterIsClosedOptions, filterIsHasFriendsOptions } from "./groups-list.constants";

export const GroupsList = () => {
  const [groupsFilterParams, setGroupsFilterParams] = useState<IFetchParams>(
    {}
  );
  const [groups, isLoading, error] = useGetGroups(groupsFilterParams);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (groups.data && colors.length <= 1) {
      const groupsColors = groups.data
        .filter((group) => group.avatar_color)
        .map(({ avatar_color }) => avatar_color as string);
      setColors(["all", ...Array.from(new Set(groupsColors))]);
    }
  }, [colors.length, groups]);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!groups.data || !groups.result) {
    return <Text>Ошибка получения данных</Text>;
  }

  const handleChangeColor = (e: ChangeEvent<HTMLSelectElement>) => {
    const newColor = e.target.value;
    if (newColor === "all") {
      const state = { ...groupsFilterParams };
      delete state.color;
      setGroupsFilterParams(state);
      return;
    }
    setGroupsFilterParams((prev) => ({
      ...prev,
      color: newColor,
    }));
  };

  const handleChangeClosedStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const newClosedStatus = e.target.value;
    if (newClosedStatus === "all") {
      const state = { ...groupsFilterParams };
      delete state.isClosed;
      setGroupsFilterParams(state);
      return;
    }
    setGroupsFilterParams((prev) => ({
      ...prev,
      isClosed: newClosedStatus === 'close',
    }));
  };

  const handleChangeFriendsFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const newClosedStatus = e.target.value;
    if (newClosedStatus === "all") {
      const state = { ...groupsFilterParams };
      delete state.isHaveFriends;
      setGroupsFilterParams(state);
      return;
    }
    setGroupsFilterParams((prev) => ({
      ...prev,
      isHaveFriends: newClosedStatus === 'hasFriends',
    }));
  };

  return (
    <>
      <Select
        options={colors.map((color) => ({
          label: color,
          value: color,
        }))}
        onChange={handleChangeColor}
        placeholder="Цвета"
        fetching={isLoading}
      />
      <Select
        options={filterIsClosedOptions}
        onChange={handleChangeClosedStatus}
        placeholder="Статус"
        fetching={isLoading}
      />
      <Select
        options={filterIsHasFriendsOptions}
        onChange={handleChangeFriendsFilter}
        placeholder="Друзья"
        fetching={isLoading}
      />
      {isLoading ? (
        <Spinner size="large" />
      ) : (
        <Group
          className="group"
          header={<Header mode="secondary">Группы</Header>}
        >
          {groups.data?.map((group) => (
            <GroupCell key={group.id} {...group} />
          ))}
        </Group>
      )}
    </>
  );
}