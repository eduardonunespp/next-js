import {styled} from '../'

export const SuccessContainer = styled("main", {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
        maxWidth: 560,
        textAlign: 'center',
        marginBottom: '1.875rem'

    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '32px',
        lineHeight: '1.5em'
    },

    a: {
        display: 'block',
        marginTop: '50px',
        fontSize: '$lg',
        color: '$green500',
        fontWeight: 'bold',

        "&:hover": {
            color: '$gray300'
        }
    }

})

export const ImageContainer = styled("main", {
    width: '100%',
    maxWidth: '8.125rem',
    height: '9.0625rem',
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '4px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    }

})