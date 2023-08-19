const FormikError = ({error}) => {
    return (
        <div 
            className="error" 
            style={{color: '#ef7373', textAlign: 'left', marginTop: 10}}>{error}</div>
    )
};

export default FormikError;