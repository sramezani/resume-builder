import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import equal from 'deep-equal';
import { Tooltip } from 'react-tippy';

import styles from './dnd2column.module.scss';

const getDragIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 30,
});
const getAddIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 0,
    cursor: 'pointer',
});
const getRemoveIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 60,
    cursor: 'pointer',
});
const getdragedStyle = (isDragging) => ({
    position: 'relative',
    // transform: isDragging ? 'scale(1.07)' : 'scale(1)',
    '-webkit-box-shadow': isDragging
        ? '0px 0px 24px 0px rgba(0,0,0,0.16)'
        : 'none',
    '-moz-box-shadow': isDragging
        ? '0px 0px 24px 0px rgba(0,0,0,0.16)'
        : 'none',
    'box-shadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
});

const getListStyle = (isDraggingOver) => ({
    '-webkit-box-shadow': isDraggingOver
        ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)'
        : 'none',
    '-moz-box-shadow': isDraggingOver
        ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)'
        : 'none',
    'box-shadow': isDraggingOver
        ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)'
        : 'none',
    background: isDraggingOver ? 'rgba(250,250,250,1)' : '#fff',
    flex: 1,
});

class Dnd2Column extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            column1: [],
            column2: [],
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // if (!equal(props.data, state.data)) {
        if (props.data) {
            const column1 = [];
            const column2 = [];
            if (props.data.length > 0) {
                props.data.map((item, index) => {
                    if (index % 2 === 0) {
                        column1.push(item);
                    } else {
                        column2.push(item);
                    }
                });
                return {
                    column1,
                    column2,
                    data: props.data,
                };
            }
        }
        return true;
    }

    id2List = {
        droppable: 'column1',
        droppable2: 'column2',
    };

    getList = (id) => this.state[this.id2List[id]];

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    onDragEnd(result) {
        const { source, destination } = result;

        if (!result.destination) {
            return;
        }

        let c1 = this.state.column1;
        let c2 = this.state.column2;
        if (source.droppableId === destination.droppableId) {
            const column1 = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable') {
                c1 = column1;
            } else {
                c2 = column1;
            }
        } else {
            const ttt = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            c1 = ttt.droppable;
            c2 = ttt.droppable2;
        }

        let i = 1;
        // let lamp = [];
        // c1.map((item) => {
        // 	lamp.push(item);
        // })
        c2.map((item) => {
            c1.splice(i, 0, item);
            i = i + 2;
        });
        if (!equal(this.state.data, c1)) {
            this.props.reorder(c1);
        }

        this.setState({
            data: c1,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                className={
                                    snapshot.isDraggingOver
                                        ? styles.selectedDragItems
                                        : styles.unselectedDragItems
                                }
                            >
                                {this.state.column1.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}>
                                                <div
                                                    {...provided.draggableProps}
                                                >
                                                    <div
                                                        className={
                                                            styles.dragBox
                                                        }
                                                        style={getdragedStyle(
                                                            snapshot.isDragging
                                                        )}
                                                    >
                                                        {this.props.renderItem(
                                                            item
                                                        )}
                                                        <div
                                                            style={getAddIconStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                            className={
                                                                styles.dragBoxIcon
                                                            }
                                                            onClick={() =>
                                                                this.props.additem()
                                                            }
                                                        >
                                                            <Tooltip
                                                                title="Add New Item"
                                                                arrow
                                                                distance={20}
                                                            >
                                                                <i
                                                                    className={
                                                                        'material-icons ' +
                                                                        styles.dndIcon
                                                                    }
                                                                >
                                                                    add
                                                                </i>
                                                            </Tooltip>
                                                        </div>
                                                        {this.state.data
                                                            .length > 1 && (
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getDragIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                className={
                                                                    styles.dragBoxIcon
                                                                }
                                                            >
                                                                <Tooltip
                                                                    title="Change Position"
                                                                    arrow
                                                                    distance={
                                                                        20
                                                                    }
                                                                >
                                                                    <i
                                                                        className={
                                                                            'material-icons ' +
                                                                            styles.dndIcon
                                                                        }
                                                                    >
                                                                        drag_handle
                                                                    </i>
                                                                </Tooltip>
                                                            </div>
                                                        )}
                                                        {this.state.data
                                                            .length > 1 && (
                                                            <div
                                                                style={getRemoveIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                className={
                                                                    styles.dragBoxIcon
                                                                }
                                                                onClick={() =>
                                                                    this.props.removeitem(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <Tooltip
                                                                    title="Remove"
                                                                    arrow
                                                                    distance={
                                                                        20
                                                                    }
                                                                >
                                                                    <i
                                                                        className={
                                                                            'material-icons ' +
                                                                            styles.dndIcon
                                                                        }
                                                                    >
                                                                        remove
                                                                    </i>
                                                                </Tooltip>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                className={
                                    snapshot.isDraggingOver
                                        ? styles.selectedDragItems
                                        : styles.unselectedDragItems
                                }
                            >
                                {this.state.column2.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}>
                                                <div
                                                    {...provided.draggableProps}
                                                >
                                                    <div
                                                        className={
                                                            styles.dragBox
                                                        }
                                                        style={getdragedStyle(
                                                            snapshot.isDragging
                                                        )}
                                                    >
                                                        {this.props.renderItem(
                                                            item
                                                        )}
                                                        <div
                                                            style={getAddIconStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                            className={
                                                                styles.dragBoxIcon
                                                            }
                                                            onClick={() =>
                                                                this.props.additem()
                                                            }
                                                        >
                                                            <Tooltip
                                                                title="Add New Item"
                                                                arrow
                                                                distance={20}
                                                            >
                                                                <i
                                                                    className={
                                                                        'material-icons ' +
                                                                        styles.dndIcon
                                                                    }
                                                                >
                                                                    add
                                                                </i>
                                                            </Tooltip>
                                                        </div>
                                                        {this.state.data
                                                            .length > 1 && (
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getDragIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                className={
                                                                    styles.dragBoxIcon
                                                                }
                                                            >
                                                                <Tooltip
                                                                    title="Change Position"
                                                                    arrow
                                                                    distance={
                                                                        20
                                                                    }
                                                                >
                                                                    <i
                                                                        className={
                                                                            'material-icons ' +
                                                                            styles.dndIcon
                                                                        }
                                                                    >
                                                                        drag_handle
                                                                    </i>
                                                                </Tooltip>
                                                            </div>
                                                        )}
                                                        {this.state.data
                                                            .length > 1 && (
                                                            <div
                                                                style={getRemoveIconStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style
                                                                )}
                                                                className={
                                                                    styles.dragBoxIcon
                                                                }
                                                                onClick={() =>
                                                                    this.props.removeitem(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <Tooltip
                                                                    title="Remove"
                                                                    arrow
                                                                    distance={
                                                                        20
                                                                    }
                                                                >
                                                                    <i
                                                                        className={
                                                                            'material-icons ' +
                                                                            styles.dndIcon
                                                                        }
                                                                    >
                                                                        remove
                                                                    </i>
                                                                </Tooltip>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

/* Export Component =============================== */
export default Dnd2Column;
