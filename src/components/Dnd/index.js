import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import equal from 'deep-equal';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: '26px',
  height: '26px',
  background: 'red',
  position: 'absolute',
  borderRadius: '100%',
  top: -13,
  right: 30,
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,
// transform: isDragging ? 'scale(1.1)' : 'scale(1)'
  // change background colour if dragging
//   background: isDragging ? "#fff" : "#9a9",

  // styles we need to apply on draggables
//   ...draggableStyle
});
const getItemStyle2 = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: '26px',
  height: '26px',
  background: 'green',
  position: 'absolute',
  borderRadius: '100%',
  top: -13,
  right: 0,
  cursor: 'pointer'
//   display: 'none'
});
const getItemStyle3 = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: '26px',
  height: '26px',
  background: 'blue',
  position: 'absolute',
  borderRadius: '100%',
  top: -13,
  right: 60,
  cursor: 'pointer'
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#efefef" : "#fff",
//   padding: grid,
//   width: 250
});

class Dnd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
        
        if (!equal(props.data.length, state.data.length)) {
			return {
                data: props.data
            };
		}
		return true;
    }

	// a little function to help us with reordering the result
	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const data = this.reorder(
			this.state.data,
			result.source.index,
			result.destination.index
		);

		if (!equal(this.state.data, data)) {
			this.props.reorder(data);
		}

		this.setState({
			data
		});
	}

  	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					style={getListStyle(snapshot.isDraggingOver)}
					>
					{
						this.state.data.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided, snapshot) => (
									<div ref={provided.innerRef} >
										<div {...provided.draggableProps}>
											<div className="xxxx" style={{ position: 'relative' }}>
												{this.props.renderItem(item)}
												<div
													style={getItemStyle2(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
													className="testtt"
													onClick={() => this.props.additem()}
												>
													A
												</div>
												{
													this.state.data.length > 1 &&
														<div
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
															className="testtt"
														>
															{/* {item.id} */}
															X
														</div>
												}
												{
													this.state.data.length > 1 &&
														<div
															style={getItemStyle3(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
															className="testtt"
															onClick={() => this.props.removeitem(item.id)}
														>
															R
														</div>
												}
											</div>
										</div>
									</div>
								)}
							</Draggable>
						))
					}
					{provided.placeholder}
					</div>
				)}
				</Droppable>
			</DragDropContext>
		);
  }
}

/* Export Component =============================== */
export default Dnd;
