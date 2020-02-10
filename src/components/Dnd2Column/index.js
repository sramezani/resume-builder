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
  padding: grid,
  flex: 1
//   width: 250
});

class Dnd2Column extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			column1: [],
			column2: []
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentDidMount() {
		console.log(111111111111111)
		// this._setItem();
		// console.log(this.state.data)
	}

	_setItem = () => {
		let { data } = this.state;
		console.log(data)
		let column1 =[];
		let column2 =[];
		if (data.length > 0){
			data.map((item, index) => {
				if (index % 2 === 0) {
					column1.push(item);
				}
				else {
					column2.push(item);
				}
			})
			this.setState({
				column1,
				column2
			})
		}
	}

	static getDerivedStateFromProps(props, state) {
        // console.log(props.data)
        // console.log(state.data)
        if (!equal(props.data, state.data)) {
			let column1 =[];
			let column2 =[];
			console.log(12121212)
			if (props.data.length > 0){
				props.data.map((item, index) => {
					if (index % 2 === 0) {
						column1.push(item);
					}
					else {
						column2.push(item);
					}
				})
				return {
					column1,
					column2,
					data: props.data
				}
			}
			// return {
            //     data: props.data,
            // };
		}
		return true;
	}
	
	id2List = {
        droppable: 'column1',
        droppable2: 'column2'
	};
	
	getList = id => this.state[this.id2List[id]];

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
		// dropped outside the list
		const { source, destination } = result;

		if (!result.destination) {
			return;
		}

		let c1 = this.state.column1;
		let c2 = this.state.column2; 
		console.log('0c1', c1)
		console.log('0c2', c2)
		if (source.droppableId === destination.droppableId) {
            const column1 = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

			let state = { column1 };
			c1 = column1;
			console.log(c1)
            if (source.droppableId === 'droppable2') {
				state = { column2: column1 };
				c2 = column1;
            }
            this.setState(state);
        } else {
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
			);
			c1 = result.droppable;
			c2 = result.droppable2;
            this.setState({
                column1: result.droppable,
                column2: result.droppable2
            });
		}
		
		console.log('c1', c1)
		console.log('c2', c2)
		

		let i = 1;
		c2.map((item) => {
			// this.insert(lamp, i, item)
			c1.splice(1, 0, item)
			i = i + 2;
		})
		console.log('c3', this.state.data)
		console.log('c4', c1)
		if (!equal(this.state.data, c1)) {
			this.props.reorder(c1);
		}

		this.setState({
			data: c1
		});
	}

	insert = (arr, index, newItem) => [
		...arr.slice(0, index),
		newItem,
		...arr.slice(index)
	];

  	render() {
		
		console.log('a',this.state.column1)
		return (
			<div style={{ display: 'flex' }}>
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
						// {...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
					{
						this.state.column1.map((item, index) => (
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
												{/* {
													this.state.data.length > 1 && */}
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
												{/* } */}
												{/* {
													this.state.data.length > 1 && */}
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
												{/* } */}
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
				<Droppable droppableId="droppable2">
				{(provided, snapshot) => (
					<div
					// {...provided.droppableProps}
					ref={provided.innerRef}
					style={getListStyle(snapshot.isDraggingOver)}
					>
					{
						this.state.column2.map((item, index) => (
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
												{/* {
													this.state.data.length > 1 && */}
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
												{/* } */}
												{/* {
													this.state.data.length > 1 && */}
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
												{/* } */}
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
			</div>
		);
  }
}

/* Export Component =============================== */
export default Dnd2Column;
