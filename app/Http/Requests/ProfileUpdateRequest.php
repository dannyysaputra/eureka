<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $this->user()->id,
            'nim' => 'sometimes|required|string|max:255|unique:users,nim,' . $this->user()->id,
            'nip' => 'sometimes|required|string|max:255|unique:dosens,nip,' . $this->user()->id,
            'angkatan' => 'sometimes|required|integer',
            'jurusanId' => 'sometimes|required|integer|exists:jurusans,id',
            'password' => 'nullable|string|min:8|confirmed',
        ];
    }
}
