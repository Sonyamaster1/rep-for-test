import { SimpleCell, Text } from "@vkontakte/vkui";
import { Icon24CircleSmall } from "@vkontakte/icons";
import { IGroup } from "../../api/groups/groups.types";
import { useState } from "react";

export const GroupCell = ({
  avatar_color,
  friends,
  closed,
  members_count,
  name,
}: IGroup) => {
  const [showFriends, setShowFriends] = useState(false);
  return (
    <SimpleCell
      multiline={showFriends}
      className="cell"
      hovered
      before={
        <Icon24CircleSmall
          width={36}
          height={36}
          fill={avatar_color || "transparent"}
        />
      }
      subhead={closed ? "Закрытая" : "Открытая"}
      subtitle={
        friends && (
          <Text
            onClick={() => setShowFriends(!showFriends)}
            className="friends"
          >{`Друзей: ${friends?.length}`}</Text>
        )
      }
      extraSubtitle={`Подписчиков: ${members_count}`}
      expandable="always"
    >
      <Text weight="1" size={12}>{name}</Text>
      {friends && showFriends && (
        <>
          {friends.map((friend, idx) => (
            <Text size={1} key={idx}>{`${friend.first_name} ${friend.last_name}`}</Text>
          ))}
        </>
      )}
    </SimpleCell>
  );
};
