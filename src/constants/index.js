export const PROFILE_ITEMS_METADATA = {
    name: {
        key: 'name',
        title: 'What\'s your name?'
    },
    phone: {
        key: 'phone',
        title: 'What\'s your phone number?',
    },
    email: {
        key: 'email',
        title: 'Your email address',
    },
    summary: {
        key: 'summary',
        title: 'What type of passenger are you ?',
    }
};

export const PROFILE_ITEMS_INPUTS = {
    name: {
        key: 'name',
        inputs: [
            { inputKey: 'firstName', label: 'First Name', val: ''},
            { inputKey: 'lastName', label: 'Last Name', val: '' },
        ]
    },
    phone: {
        key: 'phone',
        inputs: [
            { inputKey: 'phone', label: 'Your Phone Number', val: '', keyboardType: 'numeric'},
        ]
    },
    email: {
        key: 'email',
        inputs: [
            { inputKey: 'email', label: 'Your email address', val: '', keyboardType: 'email-address'},
        ]
    },
    summary: {
        key: 'summary',
        inputs: [
            { 
                inputKey: 'summary', 
                label: '',
                val: '', 
                maxLength: 200, 
                multiline: true,
                placeholder: 'Write a little bit about yourself. Do you like chatting? Are you a smoker? Do you bring pets with you? Etc'
        },
        ]
    }
};