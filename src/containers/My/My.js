import React, {Component} from 'react'
import './My.css'
import {connect} from "react-redux";
import {changeName} from "../../store/actions/my";

class My extends Component {
    render() {
        return (
            <main className={"wrapper"}>
                <section className={"hero"}></section>
                <article>
                    <p>Explore local breweries with just one click and stirred by starlight across the centuries light years great turbulent clouds circumnavigated paroxysm of global death.</p>
                    <a href="#breweries">Browse Breweries</a>

                </article>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        my: state.my.name
    }

}

function mapDispatchToProps(dispatch) {
    return {
        changeName: () => dispatch(changeName())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(My);