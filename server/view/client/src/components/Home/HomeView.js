import React from 'react'
import {Link, NavLink} from 'react-router-dom'


const HomeView = () => {
	return (<div>
			<div>
				<NavLink to="/commission">Dodaj zlecenie dostawy</NavLink>
			</div>
			<div>
			<NavLink to="/order">Dodaj zamówienie</NavLink>
			</div>
		</div>
	)
}

export default HomeView;