import { useEffect, useState } from 'react'
import tokens from '../connection/tokens'
import markets from '../configs/markets'
import { ListGroup } from 'react-bootstrap'

const Market = (props) => {
  return (
    <ListGroup defaultActiveKey="#link1">
      {markets.map((market) => {
        return (
          <ListGroup.Item key={market.name} value={market.name} action onClick={props.onMarketChange}>
            {market.name}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default Market
