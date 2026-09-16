<?php

use App\Models\User;

test('renders the login page for guests', function () {
    $this->get(route('login'))->assertOk();
});

test('redirects authenticated users away from the login page', function () {
    $this->actingAs(User::factory()->create());

    $this->get(route('login'))->assertRedirect(route('dashboard'));
});

test('authenticates with valid credentials and redirects to the dashboard', function () {
    $user = User::factory()->create(['password' => bcrypt('password')]);

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticatedAs($user);
});

test('rejects invalid credentials', function () {
    $user = User::factory()->create(['password' => bcrypt('password')]);

    $response = $this->from(route('login'))->post(route('login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $response->assertRedirect(route('login'));
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('logs the user out', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->post(route('logout'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});
