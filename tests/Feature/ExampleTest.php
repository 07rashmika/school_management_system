<?php

test('redirects the root url to the admission application page', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect('/apply');
});
