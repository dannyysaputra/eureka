export default function ArrowButton({ fillColor }) {
    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.625 30C5.625 43.4613 16.5387 54.375 30 54.375C43.4613 54.375 54.375 43.4613 54.375 30C54.375 16.5387 43.4613 5.625 30 5.625C16.5387 5.625 5.625 16.5387 5.625 30ZM30.5449 19.2937C30.7198 19.4672 30.8587 19.6733 30.9539 19.9005C31.0491 20.1276 31.0985 20.3713 31.0995 20.6175C31.1005 20.8638 31.053 21.1079 30.9596 21.3357C30.8663 21.5636 30.7289 21.7709 30.5555 21.9457L24.4242 28.125H40.0781C40.5754 28.125 41.0523 28.3225 41.404 28.6742C41.7556 29.0258 41.9531 29.5027 41.9531 30C41.9531 30.4973 41.7556 30.9742 41.404 31.3258C41.0523 31.6775 40.5754 31.875 40.0781 31.875H24.4242L30.5555 38.0543C30.7289 38.2293 30.8662 38.4367 30.9595 38.6647C31.0527 38.8928 31.1002 39.1369 31.0991 39.3833C31.098 39.6297 31.0484 39.8734 30.9531 40.1006C30.8578 40.3278 30.7187 40.534 30.5438 40.7074C30.3688 40.8809 30.1614 41.0181 29.9333 41.1114C29.7053 41.2047 29.4611 41.2521 29.2148 41.251C28.9684 41.25 28.7247 41.2004 28.4975 41.1051C28.2703 41.0098 28.0641 40.8707 27.8906 40.6957L18.5871 31.3207C18.2386 30.9695 18.043 30.4948 18.043 30C18.043 29.5052 18.2386 29.0305 18.5871 28.6793L27.8906 19.3043C28.0641 19.1291 28.2704 18.9898 28.4978 18.8945C28.7251 18.7991 28.969 18.7495 29.2156 18.7485C29.4621 18.7475 29.7064 18.7952 29.9346 18.8887C30.1627 18.9823 30.3701 19.1199 30.5449 19.2937Z"
                fill={fillColor}
            />
        </svg>
    );
}
