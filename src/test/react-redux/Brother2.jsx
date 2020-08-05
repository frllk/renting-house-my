import React, { Component } from 'react'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    count: state.count,
    userName: state.user
  }
}

class Brother2 extends Component {
  render () {
    const { count, userName } = this.props
    return (
      <div>
        Brother2
        <br />
        <br />
        仓库中的新值---{count}---{userName}
        <p>todo：</p>
      </div>
    )
  }
}
export default connect(mapStateToProps, null)(Brother2)