'use client';
import React, { use } from 'react';


type tParams = Promise<{ id: string }>;

const EventDetailPage = ({ params }: { params: tParams }) => {
    const { id } = use(params);
    console.log("🚀 ~ EventDetailPage ~ id:", id)
    return (
        <div>id</div>
    )
}

export default EventDetailPage;