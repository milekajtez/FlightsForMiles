import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadDiscounts } from '../../../../redux/system-admin/discounts/discountsAction'

function DiscountTable() {
    const dispatch = useDispatch();
    const [loadVar] = useState(true)

    const discounts = useSelector(
        state => state.discount
    )

    useEffect(() => {
        dispatch(loadDiscounts())
    }, [loadVar, dispatch])
    

    return (
        <main>
            <table>
                <thead>
                    <tr>
                        <th>TYPE OF DISCOUNT</th>
                        <th>CURRENT VALUE</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Quick booking</td>
                        <td>{discounts.discQuick}%</td>
                    </tr>
                    <tr>
                        <td>300 - 600 points</td>
                        <td>{discounts.disc300}%</td>
                    </tr>
                    <tr>
                        <td>600 - 1200 points</td>
                        <td>{discounts.disc600}%</td>
                    </tr>
                    <tr>
                        <td>&lt; 1200</td>
                        <td>{discounts.disc1200}%</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export default DiscountTable
