import styled from 'styled-components';

export default styled.div `
	color: #DE350B;
	position: ${props => props.big? 'absolute': 'static'};
	font-size: ${props => props.big? '28px' :'12px'};
	${props => props.big? 'font-weight: bold' : ''};
	${props => props.big?`left: 30%;
	transform: translateX(-50%);
	margin-top: 5px;
	` : ''}
`