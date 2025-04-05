export interface BatchTokenCardanoInfo {
    subjects: BatchTokenCardanoSubject[]
}

export interface BatchTokenCardanoSubject {
    subject: string
    logo: BatchTokenCardanoLogo
}


export interface BatchTokenCardanoLogo {
    signatures: BatchTokenCardanoSignature[]
    sequenceNumber: number
    value: string
}

export interface BatchTokenCardanoSignature {
    signature: string
    publicKey: string
}
