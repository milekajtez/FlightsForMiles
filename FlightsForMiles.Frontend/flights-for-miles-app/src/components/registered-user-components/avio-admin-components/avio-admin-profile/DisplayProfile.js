import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { loadProfileData } from '../../../../redux/avio-admin/profile/profileAction'

function DisplayProfile() {
    const dispatch = useDispatch()
    const params = useParams()

    const profile = useSelector(
        state => state.profile,
    ) 

    useEffect(() => {
        dispatch(loadProfileData(params.username))
    }, [params.username, dispatch])

    return (
        <>
            <div className="profile-card__name">{profile.profileData.username}</div>
            <div className="profile-card__txt">{profile.profileData.type}</div>
            <div className="profile-card-inf">
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Phone number</div>
                    <div className="profile-card-inf__txt">{profile.profileData.telephone}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">E-mail</div>
                    <div className="profile-card-inf__txt">{profile.profileData.email}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Points</div>
                    <div className="profile-card-inf__txt">{profile.profileData.points}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">First name</div>
                    <div className="profile-card-inf__txt">{profile.profileData.firstname !== null ? profile.profileData.firstname : 'None'}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Last name</div>
                    <div className="profile-card-inf__txt">{profile.profileData.lastname !== null ? profile.profileData.lastname : 'None'}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Personal indetify number</div>
                    <div className="profile-card-inf__txt">{profile.profileData.pin}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Address</div>
                    <div className="profile-card-inf__txt">{profile.profileData.address !== null ? profile.profileData.address : 'None'}</div>
                </div>
                <div className="profile-card-inf__item">
                    <div className="profile-card-inf__title">Number of pasport</div>
                    <div className="profile-card-inf__txt">{profile.profileData.passport !== null ? profile.profileData.passport : 'None'}</div>
                </div>
            </div>
        </>
    )
}

export default DisplayProfile
