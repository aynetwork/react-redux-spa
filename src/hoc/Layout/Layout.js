import React, {Component} from 'react'
import classes from './Layout.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        menu : false
    }


    ToggleMenuHandler = () => {
        this.setState({
            menu : !this.state.menu
        })
    }

    render(){
        return (
            <div className={classes.Layout}>

                <MenuToggle
                    onToggle={this.ToggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <Drawer
                    onClose={this.ToggleMenuHandler}
                    isOpen={this.state.menu}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        isAuthenticated : !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)