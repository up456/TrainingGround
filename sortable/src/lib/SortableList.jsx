import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import './SortableList.css';
import SortableListItem from './SortableListItem';

const SortableList = ({ data, onDropItem, onClickItem, rederItem }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);

  const onDragStart = (index) => setStartIndex(index);

  const onDrop = useCallback(
    (dropIndex) => {
      const dragItem = listData[startIndex];
      const list = [...listData];
      list.splice(startIndex, 1);
      const newListData =
        startIndex < dropIndex
          ? [
              ...list.slice(0, dropIndex - 1),
              dragItem,
              ...list.slice(dropIndex - 1, list.length),
            ]
          : [
              ...list.slice(0, dropIndex),
              dragItem,
              ...list.slice(dropIndex, list.length),
            ];
      setListData(newListData);
      onDropItem(newListData);
    },
    [listData, onDropItem, startIndex]
  );

  return (
    <div>
      <ul className="sortable-list">
        {listData.map((item, index) => {
          return (
            <SortableListItem
              key={index}
              index={index}
              draggable={true}
              onDragStart={onDragStart}
              onDropItem={onDrop}
              onClickItem={onClickItem}
            >
              {rederItem(item, index)}
            </SortableListItem>
          );
        })}
        <SortableListItem
          key={listData.length}
          index={listData.length}
          draggable={false}
          onDropItem={onDrop}
        />
      </ul>
    </div>
  );
};

export default SortableList;
