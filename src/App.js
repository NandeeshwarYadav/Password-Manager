import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    pswrdCount: 0,
    website: '',
    userName: '',
    password: '',
    websitesList: [],
    checkboxValue: false,
    searchInput: '',
    noPassowrdImg: '',
  }

  onClickAdd = event => {
    event.preventDefault()
    const {website, userName, password, addBtnClicked} = this.state
    const checkInputs = website !== '' && userName !== '' && password !== ''
    if (checkInputs) {
      const newList = {
        id: uuidv4(),
        websiteName: website,
        user: userName,
        pswrd: password,
      }
      this.setState(prevState => ({
        pswrdCount: prevState.pswrdCount + 1,
        websitesList: [...prevState.websitesList, newList],
        website: '',
        userName: '',
        password: '',
      }))
    }
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({checkboxValue: event.target.checked})
  }

  onClickDelete = id => {
    const {websitesList} = this.state
    const deleteList = websitesList.filter(each => each.id !== id)
    this.setState({websitesList: deleteList})
  }

  onChangeSearchInput = event => {
    const {websitesList, searchInput} = this.state
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      website,
      userName,
      password,
      websitesList,
      checkboxValue,
      pswrdCount,
      searchInput,
      addBtnClicked,
    } = this.state

    const passwordImg = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars"
      />
    )

    const filterdSearchList = websitesList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className=" bg">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="sub-bg">
          <div className="card">
            <form onSubmit={this.onClickAdd}>
              <h1 className="para">Add New Password</h1>
              <div className="input-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="img"
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="img"
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={this.onChangeUsername}
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="img"
                  />
                </div>
                <div className="input">
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
              </div>
              <div className="button-container">
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="password-manager-md">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-img"
            />
          </div>
          <div className="password-manager-sm">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-img"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-flex">
            <div className="your-passwords">
              <div>
                <h1 className="head">Your Passwords</h1>
              </div>
              <div>
                <p className="count">{filterdSearchList.length}</p>
              </div>
            </div>
            <div className="input-container">
              <div className="input-logo">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="img"
                />
              </div>
              <div className="input">
                <input
                  type="search"
                  className="input-box"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
          </div>
          <hr />

          <div className="websites">
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkboxId"
                checked={checkboxValue}
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="checkboxId" className="label">
                Show passwords
              </label>
            </div>
            {filterdSearchList.length > 0 ? (
              <ul className="websites-list">
                {filterdSearchList.map(each => (
                  <li className="website-card" key={each.id}>
                    <div className="name">
                      <p>{each.websiteName[0]}</p>
                    </div>
                    <div className="input-values">
                      <p>{each.websiteName}</p>
                      <p>{each.user}</p>
                      {checkboxValue ? <p>{each.pswrd}</p> : passwordImg}
                    </div>
                    <div className="button">
                      <button
                        type="button"
                        data-testid="delete"
                        className="button"
                        onClick={() => this.onClickDelete(each.id)}
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          alt="delete"
                          className="delete"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="websites">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                  className="no-passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
