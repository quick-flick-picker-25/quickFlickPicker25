render() {
        return (
            <div className="yourLists">
                <div className="wrapper">
                    <h2>Your Lists:</h2>
                    <form className="listInput" action="" onSubmit={this.handleUserListName}>
                        <label className="labelHidden" htmlFor="listName">Please enter a list name</label>
                        <input onChange={this.handleUserInput} type="text" id="listName" placeholder="New list name" value={this.state.userListName}/>
                        <button className="roundButton" type="submit">
                            <i class="fas fa-plus"></i>
                        </button>
                    </form>
                    <ul>
                        {
                            this.state.usersList.map((list)=>{
                                return(
                                    <li className="dropDownList" key={list.key}>
                                        <h3>{list.key}</h3>
                                        <div className="movies">
                                            <a className="showMovies" href="" onClick={this.handleReload}>
                                                <i class="fas fa-chevron-down"></i>
                                            </a>
                                            <ul className="moviesDisplayed">
                                                {this.handleMovieName(list).map((movie, index) => {
                                                    return(
                                                        <li className="listItem" key={index}>
                                                            
                                                                <p>{movie}</p>
                                                                <button>
                                                                    <i class="fas fa-trash-alt"></i>
                                                                </button>
                                                            
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        {/* <Link to={`/watch-movie/${list.key}`}>Watch Movie</Link> */}
                                        {/* <Link to={{ pathname: `/watch-movie/`, state: {specificList: list.key}}}>Watch Movie</Link>
                                        <button onClick={() => { this.handleDeleteList(list.key) }}><i class="fas fa-trash-alt"></i></button> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>